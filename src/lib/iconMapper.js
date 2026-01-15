import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

/**
 * Maps social link labels to their corresponding icon components
 * Uses normalized matching to handle case variations and typos
 */
export function getIconFromLabel(label) {
  if (!label || typeof label !== 'string') {
    return GitHubIcon // Safe default
  }

  const normalized = label.toLowerCase().trim()

  // Explicit matching with priority order
  if (normalized.includes('github') || normalized.includes('git hub')) {
    return GitHubIcon
  }
  if (normalized.includes('linkedin') || normalized.includes('linked in')) {
    return LinkedInIcon
  }
  if (normalized.includes('instagram') || normalized.includes('insta')) {
    return InstagramIcon
  }
  if (normalized.includes('twitter') || normalized.includes('x.com') || normalized === 'x') {
    return TwitterIcon
  }

  // Fallback for unknown types
  return GitHubIcon
}
