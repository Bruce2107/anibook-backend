/// <reference types="node" />

declare module 'webp-converter' {
  import webp from 'webp-converter';
  /**
   *
   * @param oldPath The path of file to be converted
   * @param newPath The path of new file with .webp extension
   * @param options Options for conversion
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function cwebp(
    oldPath: string,
    newPath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.webp)
   * @param newPath The path of file with another extension
   * @param options Options for conversion
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function dwebp(
    oldPath: string,
    newPath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.gif)
   * @param newPath The path of file with .webp extension
   * @param options Options for conversion
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function gif2webp(
    oldPath: string,
    newPath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.webp)
   * @param newPath The path of file with another extension
   * @param profilePath The path of options
   * @param options For ICC: icc, For XMP metadata: xmp, For EXIF metadata: exif
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function webpmux_add(
    oldPath: string,
    newPath: string,
    profilePath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.webp)
   * @param newPath The path of file with (.icc | .xmp | .exif) extension
   * @param options For ICC: icc, For XMP metadata: xmp, For EXIF metadata: exif
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function webpmux_extract(
    oldPath: string,
    newPath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.webp)
   * @param newPath The path of file with (.webp) extension
   * @param options For ICC: icc, For XMP metadata: xmp, For EXIF metadata: exif
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function webpmux_strip(
    oldPath: string,
    newPath: string,
    options: string,
    func: Function
  ): any;

  /**
   *
   * @param FrameOptions An array with frames e.g ['file_i +di[+xi+yi[+mi[bi]]]',...] 
   * Where: file_i is the i'th frame (WebP format), xi,yi specify the image offset for this frame, 
      di is the pause duration before next frame, mi is the dispose method for this frame (0 for NONE or 1 for BACKGROUND) and bi is the blending method for this frame (+b for BLEND or -b for NO_BLEND). 
      Argument bi can be omitted and will default to +b (BLEND). Also, mi can be omitted if bi is omitted and will default to 0 (NONE). Finally, 
      if mi and bi are omitted then xi and yi can be omitted and will default to +0+0.
   * @param newPath The path of animation
   * @param loop Loop the frames n number of times. 0 indicates the frames should loop forever. Valid range is 0 to 65535 [Default: 0 (infinite)].
   * @param bgcolor Background color of the canvas. Where: A, R, G and B are integers in the range 0 to 255 specifying the Alpha, Red, Green and Blue component values respectively [Default: 255,255,255,255].
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function webpmux_animate(
    FrameOptions: Array<string>,
    newPath,
    loop: string,
    bgcolor: string,
    func: Function
  ): any;

  /**
   *
   * @param oldPath The path of file to be converted (.webp)
   * @param newPath The path of file with (.webp) extension
   * @param frame Number of the frame
   * @param func Function that will return 100 for success or 100 for fails
   */
  export function webpmux_getframe(
    oldPath: string,
    newPath: string,
    frame: string,
    func: Function
  ): any;
}
