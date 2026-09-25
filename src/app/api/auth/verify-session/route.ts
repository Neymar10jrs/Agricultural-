import { NextRequest, NextResponse } from 'next/server';
import { getApps, initializeApp, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const PROJECT_ID = 'sign-in-method-46a0f';

// Initialize Firebase Admin app
function initAdmin() {
  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        initializeApp({
          credential: cert(serviceAccount),
          projectId: PROJECT_ID,
        });
      } catch (err) {
        console.warn('Could not parse FIREBASE_SERVICE_ACCOUNT_KEY, initializing with projectId:', err);
        initializeApp({ projectId: PROJECT_ID });
      }
    } else {
      initializeApp({ projectId: PROJECT_ID });
    }
  }
  const app = getApp();
  const auth = getAuth(app);
  return {
    app,
    auth: () => auth,
  };
}

const admin = initAdmin();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Firebase ID token is required' },
        { status: 400 }
      );
    }

    // Verify ID token via Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, phone_number } = decodedToken;

    // Normalize phone number (strip +91 prefix for clean 10-digit number)
    const phone = phone_number ? phone_number.replace(/^\+91/, '') : '';

    const sessionUser = {
      uid,
      phoneNumber: phone_number || '',
      phone: phone || phone_number || '',
      authenticatedAt: new Date().toISOString(),
    };

    // Create session response
    const response = NextResponse.json({
      success: true,
      message: 'Session successfully verified',
      user: sessionUser,
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('bkin_auth_session', JSON.stringify(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Firebase token verification error in /api/auth/verify-session:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Invalid or expired Firebase ID token',
      },
      { status: 401 }
    );
  }
}
