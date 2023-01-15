import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, filter } from 'rxjs';
import { Cocktail } from '../interfaces/cocktail.interface';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  public cocktails$: BehaviorSubject<Cocktail[] | []> = new BehaviorSubject<
    Cocktail[] | []
  >([]);

  public getCocktail(index: number): Observable<Cocktail> {
    return this.cocktails$.pipe(
      filter((cocktails: Cocktail[]) => cocktails != null),
      map((cocktails: Cocktail[]) => cocktails[index])
    );
  }

  public addCocktail(cocktail: Cocktail): Observable<Cocktail> {
    return this.http
      .post<Cocktail>('https://restapi.fr/api/cocktails', cocktail)
      .pipe(
        tap((cocktail: Cocktail) => {
          this.cocktails$.next([...this.cocktails$.value, cocktail]);
        })
      );
  }

  public fetchCocktails(): Observable<Cocktail[]> {
    return this.http
      .get<Cocktail[] | []>('https://restapi.fr/api/cocktails')
      .pipe(
        tap((cocktails: Cocktail[]) => {
          this.cocktails$.next(cocktails);
        })
      );
  }

  public editCocktail(
    cocktailId: string,
    editedCocktail: Cocktail
  ): Observable<Cocktail> {
    return this.http
      .patch<Cocktail>(
        `https://restapi.fr/api/cocktails/${cocktailId}`,
        editedCocktail
      )
      .pipe(
        tap((savedCocktail: Cocktail) => {
          this.cocktails$.next(
            this.cocktails$.value.map((cocktail: Cocktail) => {
              if (cocktail.name === savedCocktail.name) {
                return savedCocktail;
              } else {
                return cocktail;
              }
            })
          );
        })
      );
  }

  constructor(private http: HttpClient) {
    this.seed();
  }

  public seed() {
    this.http
      .get<Cocktail[] | []>('https://restapi.fr/api/cocktails')
      .subscribe((cocktails: Cocktail[] | []) => {
        if (!cocktails.length) {
          this.http
            .post('https://restapi.fr/api/cocktails', [
              {
                name: 'Mojito',
                img: 'https://static.750g.com/images/1200-630/b520523117d647dab6b842a36f4cc7f5/mojito-le-vrai.jpg',
                description:
                  'The Mojito complimenting summer perfectly with a fresh minty taste. The mixture of white rum, mint, lime juice, \
                  sugar and soda water is crisp and clean with a relatively low alcohol content, the soda water can be replaced with \
                  sprite or 7-up. When preparing a mojito always crush the mint leaves as opposed to dicing to unlock oils that will \
                  assist with enhancing the minty flavour.',
                ingredients: [
                  { name: 'Perrier', quantity: 1 },
                  { name: 'Rhum', quantity: 1 },
                  { name: 'Menthe', quantity: 1 },
                ],
              },
              {
                name: 'Cosmopolitan',
                img: 'https://assets.afcdn.com/recipe/20180705/80274_w1024h1024c1cx2378cy1278.webp',
                description:
                  'The tangy concoction of vodka, triple sec, lime juice and cranberry juice has managed to leapfrog the venerable screwdriver \
                  as many vodka drinkers prefer the Cosmopolitan’s cleaner and slightly tart taste. The keys to the preparation of a Cosmopolitan \
                  are a good brand of cranberry juice and Cointreau Triple Sec, two essential elements to the drink.',
                ingredients: [
                  { name: 'Cranberry', quantity: 1 },
                  { name: 'Citron', quantity: 1 },
                  { name: 'Vodka', quantity: 1 },
                ],
              },
              {
                name: 'Mai Tai',
                img: 'https://www.cocktail.fr/wp-content/uploads/2017/05/mai-tai.jpg',
                description:
                  'The Mai Tai is a Polynesian-style cocktail that has a fruity tropical taste sweet and vibrant. The mixture of light and dark rum, \
                  orange curacao, orgeat syrup and lime juice has been a symbol of Tahitian culture ever since the drink was first created.',
                ingredients: [
                  { name: 'Rhum', quantity: 1 },
                  { name: 'Triple sec', quantity: 1 },
                  { name: 'Citron', quantity: 1 },
                ],
              },
            ])
            .subscribe();
        }
      });
  }
}