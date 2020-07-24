import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    providers: [HeroesService],
    styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
    public editHero: Hero;
    public heroes: Hero[];

    constructor(private heroesService: HeroesService) {}

    public ngOnInit(): void {
        this.getHeroes();
    }

    public getHeroes(): void {
        this.heroesService.getHeroes().subscribe(heroes => (this.heroes = heroes));
    }

    public edit(hero: Hero): void {
        this.editHero = hero;
    }
}
