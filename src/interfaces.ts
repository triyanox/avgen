import { SKRSContext2D } from "@napi-rs/canvas";

interface IAvatarGeneratorOptions {
  name: string;
  path?: string;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  font?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  fontFamily?: string;
}

type Font =
  | { path: string; family: string }
  | { path: string; family: string }[];

/**
 * The avatar generator interface
 */
interface IAvatarGenerator {
  /**
   * Generates an avatar
   * @returns {Promise<Buffer>} - The generated avatar
   */
  generate: () => Promise<Buffer>;
  /**
   * Get the initials of the name
   * @returns {string} - The initials of the name
   */
  getInitials: () => string;
  /**
   * Generate the path of the avatar
   * @returns {string} - The path of the avatar
   */
  generatePath: () => string;
  /**
   * Center text in the canvas
   * @param ctx - The canvas context
   * @param text - The text to center
   * @param x - The x position
   * @param y - The y position
   * @param maxWidth - The max width
   */
  centerText: (
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
  ) => void;
  /**
   *  Save the avatar to the path
   * @param buffer - The buffer of the avatar
   * @returns {Promise<void>}
   */
  save: (buffer: Buffer) => Promise<void>;
  /**
   * Check if the avatar exists
   * @returns {Promise<boolean>} - Whether the avatar exists or not
   */
  exists: () => Promise<boolean>;
  /**
   * Registers fonts fron the path
   * @param font - The font to register
   * @returns {this}
   * @example
   *
   * ```ts
   * const generator = new AvatarGenerator({ name: "John Doe" })
   *    .registerFonts({
   *        path: cwd() + "/public/fonts/SFProDisplay-Regular.ttf",
   *        family: "SFProDisplay-Regular",
   *     });
   * ```
   */
  registerFonts: (font: Font) => this;
}

export type { IAvatarGenerator, IAvatarGeneratorOptions, Font };
