import { catchError } from 'rxjs/operators';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
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

    public getHeroes(): Observable<Hero[]> {
        return this.http
            .get<Hero[]>(this.heroesUrl)
            .pipe(catchError(this.handleError('getHeroes', [])));
    }
}
