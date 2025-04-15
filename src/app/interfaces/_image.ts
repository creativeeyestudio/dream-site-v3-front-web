export interface ImageDataProps {
  attributes: {
    alternativeText: string;
    mime: string;
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        width: number;
        height: number;
      };
      small: {
        width: number;
        height: number;
      };
      medium: {
        width: number;
        height: number;
      };
      large: {
        width: number;
        height: number;
      };
    };
  };
}

export interface ImageProps {
  data: ImageDataProps;
}

export interface ImageMultipleProps {
  data: ImageDataProps[];
}

export interface GalleryProps {
  attributes: {
    alternativeText: string;
    mime: string;
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        width: number;
        height: number;
      };
      small: {
        width: number;
        height: number;
      };
      medium: {
        width: number;
        height: number;
      };
      large: {
        width: number;
        height: number;
      };
    };
  };
}
