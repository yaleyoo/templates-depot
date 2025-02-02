export const generateCode = (): string => {
  return Math.random().toString().slice(2, 8).padStart(6, '0');
};

export const convertToSeconds = (timeString: string): number => {
  const regex = /(\d+)\s*(m|min|h|hr)/;
  const match = timeString.match(regex);

  if (!match) {
    return null;
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 'm':
    case 'min':
    case 'mins':
    case 'minute':
    case 'minutes':
      return value * 60 * 1000;
    case 'h':
    case 'hr':
    case 'hrs':
    case 'hour':
    case 'hours':
      return value * 3600 * 1000;
    default:
      return null;
  }
};
