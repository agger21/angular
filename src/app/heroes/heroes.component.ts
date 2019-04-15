import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero[] = [{
    id: 1,
    name: 'Windstorm'
  }];
  selectName = '';
  heroes: Hero[];

  constructor(private heroService: HeroService, private router: Router) {
  }

  selThis(Obj: object, num: number) {
    this.selectName = Obj.name;
    if (num === 1) {
      console.log('inthis')
      this.router.navigateByUrl('view');
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes =  heroes );
  }



  ngOnInit() {
    this.hero = HEROES;
    this.getHeroes();
  }


}
