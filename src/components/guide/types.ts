export type GuideLayer = 'global' | 'page';

export type FocusLockState = 'focusing' | 'locked';

export type PlacementPreference = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface GuideStep {
  id: string;
  targetSelector: string;
  mobileSelector?: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  kisanTipEn?: string;
  kisanTipHi?: string;
  placement?: PlacementPreference;
  featureRoute?: string;
  highlightActionTextEn?: string;
  highlightActionTextHi?: string;
}

export interface GuideConfig {
  id: string;
  layer: GuideLayer;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  steps: GuideStep[];
}

export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}
