const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/heic",
  "image/heic-sequence",
  "image/heif",
  "image/heif-sequence",
] as const;
const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".heic", ".heif"];

type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

/**
 * 파일의 MIME 타입이 허용된 이미지 타입인지 검증
 */
export const isValidImageFile = (file: File): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(file.type as AllowedImageType);
};

/**
 * File의 MIME 타입에서 presigned URL 요청에 사용할 format key 추출
 * 예: "image/jpeg" → "jpeg", "image/png" → "png"
 */
export const getImageFormatKey = (file: File): string => {
  const subtype = file.type.split("/")[1];
  if (subtype === "jpg") return "jpeg";
  if (subtype === "heic-sequence") return "heic";
  if (subtype === "heif-sequence") return "heif";
  return subtype;
};

export { ALLOWED_IMAGE_TYPES, ALLOWED_EXTENSIONS };
