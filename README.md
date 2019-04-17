## 基本语法

#### 绑定样式
```
[class.selected]="item.name === selectName"


[ngClass]:
<div [ngClass]="{'red': true, 'blue': false}"> 
    这是一个 div
</div>


[ngStyle]:
<div [ngStyle]="{'background-color':'green'}">你好 ngStyle</div>
```

#### 管道
```
    public today=new Date();
   <p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p>
```

##### 自定义管道
```
 WelcomePipe 定义:
import { Pipe, PipeTransform } from '@angular/core';

[@Pipe](/user/Pipe)({ name: 'welcome' })

export class WelcomePipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "Welcome to " + value;
  }
} 

WelcomePipe 使用:
<div>
   <p ngNonBindable>{{ 'semlinker' | welcome }}</p>
   <p>{{ 'semlinker' | welcome }}</p> <!-- Output: Welcome to semlinker -->
</div>

```

#### ngFor循环
```
  *ngFor="let item of hero; let i = index" <!-- 把索引index赋给i -->
```

#### *ngSwitch
```
  <ul [ngSwitch]="score">
  <li *ngSwitchCase="1">已支付</li>
  <li *ngSwitchCase="2">订单已经确认</li> <li *ngSwitchCase="3">已发货</li>
  <li *ngSwitchDefault>无效</li>
  </ul>
```

#### 表单事件
```
  <input
  type="text"
  (keyup)="keyUpFn($event)"/>
  
  <input type="text" (keyup)="keyUpFn($event)"/>
  
  keyUpFn(e){
      console.log(e)
  }
```

#### 绑定HTML
```
  this.h="<h2>这是一个 h2 用[innerHTML]来解析</h2>"
  <div [innerHTML]="h"></div>
```

#### 绑定属性
```
 <div [id]="id" [title]="msg">调试工具看看我的属性</div>
```


#### ngModel、[ngModel]和[(ngModel)]的写法（https://blog.csdn.net/chelen_jak/article/details/81454166） 注意引入:FormsModule
* ngModel
	+  此时需要注意的是，单独使用ngModel时，如果没有为ngModel赋值的话，则必须存在name属性。

	+ 也就是说，单独ngModel的作用是通知ngForm.value，我要向你那里加入一个property，其key值是组件的name属性值，其value为空字符串。


* [ngModel]（单向绑定，输入框的值改变不影响表单的值，但是提交表单的时候又能体现值在）

* [(ngModel)]（双向绑定，）

#### 1.Angular 中的 dom 操作(原生 js)
```
ngAfterViewInit(){
  var boxDom:any=document.getElementById('box'); 
  boxDom.style.color='red';
}
```

#### 2.Angular 中的 dom 操作(ViewChild)
```
 import { Component ,ViewChild,ElementRef} from '@angular/core';
 
  @ViewChild('myattr') myattr: ElementRef;
  
  <div #myattr></div>
  
  ngAfterViewInit(){
  let attrEl = this.myattr.nativeElement;
  }
```

#### 父子组件中通过 ViewChild 调用子组件 的方法
1.调用子组件给子组件定义一个名称
```
<app-footer #footerChild></app-footer>
```
2.引入 ViewChild
```
import { Component, OnInit ,ViewChild} from '@angular/core';
```

3.ViewChild 和刚才的子组件关联起来
```
@ViewChild('footerChild') footer
```
4.在父组件中调用子组件方法
```
 run(){ 
    this.footer.footerRun();
 }
```

## 服务(定义公共的方法，使得方法在组件之间共享调用)
#### app.module.ts 里面引入创建的服务
```
import { StorageService } from './services/storage.service';
```


#### NgModule 里面的 providers 里面依赖注入服务
```
NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    TodolistComponent
], imports: [
    BrowserModule,
FormsModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 使用的页面引入服务，注册服务
```
  import { StorageService } from '../../services/storage.service';
  
  constructor(private storage: StorageService) {
  
  }
  
  // 使用
  
  addData(){
       // alert(this.username);
      this.list.push(this.username); 
      this.storage.set('todolist',this.list);
  }
  removerData(key){
      console.log(key); 
      this.list.splice(key,1); 
      this.storage.set('todolist',this.list);
  }
```

## Angular 父子组件以及组件之间通讯
#### 父组件给子组件传值-@input
###### tip:父组件不仅可以给子组件传递简单的数据，还可把自己的方法以及整个父组件传给子组件
1. 父组件调用子组件的时候传入数据
```
<app-header [msg]="msg"></app-header>
```
2. 子组件引入 Input 模块
```
import { Component, OnInit ,Input } from '@angular/core';
```
3. 子组件中 @Input 接收父组件传过来的数据
```
export class HeaderComponent implements OnInit {
  @Input() msg:string
  
  constructor() { }
  
  ngOnInit() {
  }
}
```
4. 子组件中使用父组件的数据
```
<p>
  child works!
  {{msg}}
</p>
```

5.把整个父组件传给子组件（通过this传递整个组件实例）
```
<app-header [home]="this"></app-header>
```
```
export class HeaderComponent implements OnInit {
  @Input() home:any
  
  constructor() { }
  
  ngOnInit() {
  }
  
  执行父组件方法 this.home.xxx()
}
```

#### 子组件通过@Output 触发父组件的方法
1.子组件引入 Output 和 EventEmitter
```
 import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
```

2.子组件中实例化 EventEmitter
```
 @Output() private outer=new EventEmitter<string>(); /*用EventEmitter和output装饰器配合使用 <string>指定类型变量*/
```

3.子组件通过 EventEmitter 对象 outer 实例广播数据
```
 sendParent(){
   // alert('zhixing');
   this.outer.emit('msg from child')
 }
```

4.父组件调用子组件的时候，定义接收事件 , outer 就是子组件的 EventEmitter 对象 outer
```
 <!--$event就是子组件emit传递的数据-->
  <app-header (outer)="runParent($event)"></app-header>
```

5. 父组件接收到数据会调用自己的 runParent 方法，这个时候就能拿到子组件的数据
```
 //接收子组件传递过来的数据 
 runParent(msg:string){
    alert(msg);
  }
```
#### 父组件通过@ViewChild 主动获取子组 件的数据和方法
1. 调用子组件给子组件定义一个名称
```
 <app-footer #footerChild></app-footer>
```
2. 引入 ViewChild
```
 import { Component, OnInit ,ViewChild} from '@angular/core';
```
3. ViewChild 和刚才的子组件关联起来
```
 @ViewChild('footerChild') footer;
```
4. 调用子组件
```
run(){ 
  this.footer.footerRun();
}
```

#### 非父子组件通讯
 + 公共的服务
 + Localstorage (推荐)
 + Cookie
 
 
 
 ## 生命周期 
 
 - ngOnChanges - 当数据绑定输入属性的值发生变化时调用
 - ngOnInit - 在第一次 ngOnChanges 后调用（请求数据一般放在这个里面）
 - ngDoCheck - 自定义的方法，用于检测和处理值的改变
 - ngAfterContentInit - 在组件内容初始化之后调用
 - ngAfterContentChecked - 组件每次检查内容时调用
 - ngAfterViewInit - 组件相应的视图初始化之后调用（dom操作放在这个里面）
 - ngAfterViewChecked - 组件每次检查视图时调用
 - ngOnDestroy - 指令销毁前调用
 
 
 

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
