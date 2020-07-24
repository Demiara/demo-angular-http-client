import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { Hero } from './hero';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
    }),
};

@Injectable()
export class HeroesService {
    private handleError: HandleError;
    private readonly heroesUrl = 'api/heroesList';

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    public addHero(hero: Hero): Observable<Hero> {
        return this.http
            .post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(catchError(this.handleError('addHero', hero)));
    }

    public deleteHero(id: number): Observable<{}> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, httpOptions).pipe(catchError(this.handleError('deleteHero')));
    }

    public getHeroes(): Observable<Hero[]> {
        return this.http
            .get<Hero[]>(this.heroesUrl)
            .pipe(catchError(this.handleError('getHeroes', [])));
    }

    public searchHeroes(term: string): Observable<Hero[]> {
        term = term.trim();
        const options = term ? { params: new HttpParams().set('name', term) } : {};
        return this.http
            .get<Hero[]>(this.heroesUrl, options)
            .pipe(catchError(this.handleError<Hero[]>('searchHeroes', [])));
    }

    public updateHero(hero: Hero): Observable<Hero> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        return this.http
            .put<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(catchError(this.handleError('updateHero', hero)));
    }
}
