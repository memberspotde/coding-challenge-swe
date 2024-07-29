import {
  CharacterSwapiData,
  ImageEnhancedData,
  ColorEnhanedData,
} from '../../types';

import { character_card_colors } from './character-colors';
import { character_card_images } from './character-images';

export function enhanceCharacterDataWithImage(
  data: CharacterSwapiData[] | ColorEnhanedData[],
): any[] {
  const imageEnhancedData: any = data.map((rawCharacterData, index) => {
    //does this character have image data ?
    const characterImageData = character_card_images.find((characterImage) => {
      return characterImage.name === rawCharacterData.name;
    });

    if (characterImageData) {
      return {
        ...rawCharacterData,
        imageUrl: characterImageData.imageUrl,
      };
    } else {
      console.log(
        'Character ',
        rawCharacterData.name,
        ' does not have a primary Image',
      );
      return {
        ...rawCharacterData,
        imageUrl: 'assets/images/none.webp',
      };
    }
  });
  return imageEnhancedData;
}

export function enhanceCharacterDataWithColors(
  data: CharacterSwapiData[] | ImageEnhancedData[],
): any[] {
  const colorEnhancedData: any = data.map((rawCharacterData, index) => {
    //does this character have color data ?
    const characterColorData = character_card_colors.find((characterColor) => {
      return characterColor.name === rawCharacterData.name;
    });

    if (characterColorData) {
      return {
        ...rawCharacterData,
        primaryColor: characterColorData.primaryColor,
      };
    } else {
      console.log(
        'Character ',
        rawCharacterData.name,
        ' does not have a primary color',
      );
      return {
        ...rawCharacterData,
        primaryColor: 'grey-200',
      };
    }
  });
  return colorEnhancedData;
}
