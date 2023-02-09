# Avgen - A simple avatar generation tool

## Installation

You can install `avgen` using `npm`:

```bash
$ npm install avgen
```
or using `yarn`:

```bash
$ yarn add avgen
```

## Usage

`avgen` has a single method `generate` which takes an object with the following properties:

- `name` - The name of the user for which the avatar is to be generated. This is used to generate the initials for the avatar.
- `path` - The path to the directory where the avatar is to be saved. This is optional and defaults to `/public/avatars`.
- `background` - The background color of the avatar. This is optional and defaults to `#fafafa`.
- `color` - The color of the initials. This is optional and defaults to `#18181b`.
- `fontFamily` - The font family of the initials. This is optional and defaults to `sArial`.
- `fontStyle` - The font style of the initials. This is optional and defaults to `normal`.
- `fontWeight` - The font weight of the initials. This is optional and defaults to `normal`.`
- `height` - The height of the avatar. This is optional and defaults to `1000`.
- `width` - The width of the avatar. This is optional and defaults to `1000`.
- `font` - The font of the initials. This is optional and defaults to `Arial`.
- `case` - The case of the initials. This is optional and defaults to `uppercase`.



```ts
import { AvatarGenerator } from 'avgen';

const avatar = await AvatarGenerator.generate({
  name : 'John Doe',
  path : "/avatars/", // default is "/public/avatars" relative to the root directory
})

console.log(avatar); // returns the path to the generated avatar
```

## Register custom fonts

You can register custom fonts by passing an object or array of objects as a second argument to the `generate` method. The object should have the following properties:

- `family` - The font family name of the font.
- `path` - The path to the font file.

```ts
import { AvatarGenerator } from 'avgen';

const avatar = await AvatarGenerator.generate({
  name : 'John Doe',
  path : "/avatars/", // default is "/public/avatars" relative to the root directory
}, {
  path: cwd() + "/public/fonts/SFProDisplay-Regular.ttf",
  family: "SFProDisplay-Regular",
})

console.log(avatar); // returns the path to the generated avatar
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Example

![Avatar example](https://raw.githubusercontent.com/triyanox/avgen/master/assets/avatar.png)

