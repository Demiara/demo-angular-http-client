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

    public add(name: string): void {
        this.editHero = undefined;
        name = name.trim();
        if (!name) {
            return;
        }
        const newHero: Hero = { name } as Hero;
        this.heroesService.addHero(newHero).subscribe(hero => this.heroes.push(hero));
    }

    public delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroesService.deleteHero(hero.id).subscribe();
    }

    public edit(hero: Hero): void {
        this.editHero = hero;
    }

    public search(searchTerm: string): void {
        this.editHero = undefined;
        if (searchTerm) {
            this.heroesService.searchHeroes(searchTerm).subscribe(heroes => (this.heroes = heroes));
        }
    }

    public update(): void {
        if (this.editHero) {
            this.heroesService.updateHero(this.editHero).subscribe(hero => {
                const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
                if (ix > -1) {
                    this.heroes[ix] = hero;
                }
            });
            this.editHero = undefined;
        }
    }
}
