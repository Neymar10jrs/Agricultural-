/**
 * Unique Permanent Farmer ID Generator
 * Generates human-readable, verifiable IDs such as FARM-IND-8X42K91
 */

export function generateFarmerId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Base32 avoiding ambiguous chars (0, 1, I, O)
  let code = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return `FARM-IND-${code}`;
}

export function isValidFarmerId(id: string): boolean {
  if (!id) return false;
  const regex = /^FARM-IND-[2-9A-HJ-NP-Z]{6,8}$/;
  return regex.test(id.trim().toUpperCase());
}
