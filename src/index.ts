import { Canvas, GlobalFonts, SKRSContext2D } from '@napi-rs/canvas';
import fs from 'fs';
import { cwd } from 'process';
import avatarGeneratorConfig from './defaults';
import { Font, IAvatarGenerator, IAvatarGeneratorOptions } from './interfaces';

/**
 * Generates an avatar with the given options
 */
export default class AvatarGenerator implements IAvatarGenerator {
  name: string;
  path: string;
  width: number;
  height: number;
  color: string;
  background: string;
  font: string;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  fontFamily: string;
  case = 'upper';

  constructor(options: IAvatarGeneratorOptions) {
    this.name = options.name;
    this.width = options.width || avatarGeneratorConfig.width;
    this.height = options.height || avatarGeneratorConfig.height;
    this.color = options.color || avatarGeneratorConfig.color;
    this.background = options.background || avatarGeneratorConfig.background;
    this.font = options.font || avatarGeneratorConfig.font;
    this.fontSize = options.fontSize || avatarGeneratorConfig.fontSize;
    this.fontWeight = options.fontWeight || avatarGeneratorConfig.fontWeight;
    this.fontStyle = options.fontStyle || avatarGeneratorConfig.fontStyle;
    this.fontFamily = options.fontFamily || avatarGeneratorConfig.fontFamily;
    this.path = options.path || avatarGeneratorConfig.path;
    this.case = options.case || avatarGeneratorConfig.case;
  }

  getInitials() {
    const name = this.name.split(' ');
    if (name.length === 1) return name[0].charAt(0);
    const initials = name[0].charAt(0) + name[name.length - 1].charAt(0);
    if (this.case === 'upper') return initials.toUpperCase();
    if (this.case === 'lower') return initials.toLowerCase();
    return initials;
  }

  generatePath() {
    return `${cwd()}${this.path}/${this.getInitials()}.png`;
  }

  registerFonts(font: Font) {
    if (Array.isArray(font)) {
      font.forEach(f => {
        GlobalFonts.registerFromPath(f.path, f.family);
      });
    } else {
      GlobalFonts.registerFromPath(font.path, font.family);
    }
    return this;
  }

  centerText(
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number
  ) {
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y, maxWidth);
  }

  generate() {
    return new Promise<Buffer>(resolve => {
      const canvas = new Canvas(this.width, this.height);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = this.background;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.font = `${this.fontStyle} ${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
      ctx.fillStyle = this.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      this.centerText(
        ctx,
        this.getInitials(),
        this.width / 2,
        this.height / 2,
        this.width
      );
      resolve(canvas.toBuffer('image/png'));
    });
  }

  save(buffer: Buffer) {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(this.generatePath(), buffer, (err: any) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  exists() {
    return new Promise<boolean>(resolve => {
      fs.access(this.generatePath(), fs.constants.F_OK, err => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  /**
   * Generate avatar
   * @param {IAvatarGeneratorOptions} options - Avatar generator options
   * @param {Font} fonts - Font to use
   */
  static async generate(options: IAvatarGeneratorOptions, fonts?: Font) {
    let avatarGenerator;
    if (fonts) {
      avatarGenerator = new AvatarGenerator(options).registerFonts(fonts);
    } else {
      avatarGenerator = new AvatarGenerator(options);
    }
    if (!(await avatarGenerator.exists())) {
      const buffer = await avatarGenerator.generate();
      await avatarGenerator.save(buffer);
    }
    return avatarGenerator.generatePath();
  }
}
