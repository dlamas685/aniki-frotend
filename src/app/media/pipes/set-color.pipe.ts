import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setColor'
})
export class SetColorPipe implements PipeTransform {

  transform(genre: string ): string {

    const styleDefault = ' text-sm sm:text-sm md:text-base lg:text-base xl:text-base mb-2';

    switch (genre) {
      case 'Action':
        return 'bg-primary mr-2 mb-2' + styleDefault;
      case 'Adventure':
        return 'bg-yellow-500 mr-2 mb-2' + styleDefault;
      case 'Comedy':
        return 'surface-800 mr-2 mb-2' + styleDefault;
      case 'Drama':
        return 'bg-pink-600 mr-2 mb-2' + styleDefault;
      case 'Ecchi':
        return 'surface-800 mr-2 mb-2' + styleDefault;
      case 'Fantasy':
        return 'bg-primary-reverse mr-2 mb-2' + styleDefault;
      case 'Horror':
        return 'bg-indigo-900 mr-2 mb-2' + styleDefault;
      case 'Mahou Shoujo':
        return 'bg-purple-800 mr-2 mb-2' + styleDefault;
      case 'Mecha':
        return 'bg-bluegray-100 mr-2 mb-2' + styleDefault;
      case 'Mystery':
        return 'bg-cyan-300 mr-2 mb-2' + styleDefault;
      case 'Psychological':
        return 'bg-teal-900 mr-2 mb-2' + styleDefault;
      case 'Romance':
        return 'bg-pink-300 mr-2 mb-2' + styleDefault;
      case 'Sci-Fi':
        return 'bg-orange-500 mr-2 mb-2' + styleDefault;
      case 'Slice of Life':
        return 'bg-yellow-300 mr-2 mb-2' + styleDefault;
      case 'Sports':
        return 'bg-green-500 mr-2 mb-2' + styleDefault;
      case 'Supernatural':
        return 'bg-orange-900 mr-2 mb-2' + styleDefault;
      case 'Thriller':
        return 'bg-bluegray-900 mr-2 mb-2' + styleDefault;
      default:
        return 'bg-primary mr-2 mb-2' + styleDefault;
    }
  }

}
