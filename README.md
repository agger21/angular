## 基本语法

#### 绑定样式
[class.selected]="item.name === selectName"

#### ngFor循环
```
  *ngFor="let item of hero; index as i"
```

#### 组件化的引入
```
  //父组件的ts引入
  import { Component, OnInit, Input } from '@angular/core';
  @Input() hero: Hero;
  <app-hero-detail [hero]="selectName"></app-hero-detail>

  //父组件的html引入
  <app-组件名字></app-组件名字>
```

#### ngModel、[ngModel]和[(ngModel)]的写法（https://blog.csdn.net/chelen_jak/article/details/81454166）
* ngModel
	+  此时需要注意的是，单独使用ngModel时，如果没有为ngModel赋值的话，则必须存在name属性。

	+ 也就是说，单独ngModel的作用是通知ngForm.value，我要向你那里加入一个property，其key值是组件的name属性值，其value为空字符串。


* [ngModel]（单向绑定，输入框的值改变不影响表单的值，但是提交表单的时候又能体现值在）

* [(ngModel)]（双向绑定，）



## 服务
```
hero.service.ts:
  import { Observable, of } from 'rxjs';
  import {HEROES} './mock-heroes.ts'

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }

hero.component.ts:
  异步获取:( Observable.subscribe() 是关键的差异点。)
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

```


## 路由
```
import { Router} from '@angular/router';
constructor(private router: Router) { }

html路由跳转:
  <a *ngFor="let hero of heroes" class="col-1-4"
      routerLink="/detail/{{hero.id}}">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </a>

js路由跳转:
this.router.navigateByUrl(`home?id=1`);

获取参数:
this.route.snapshot.paramMap.get('id')
```


##HTTP
