import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/pages/main/main.component";

import {OrderComponent} from "./components/pages/order/order.component";
import {ProductComponent} from "./components/pages/product/product.component";
import {CatalogComponent} from "./components/pages/catalog/catalog.component";

const routes: Routes = [
  {path: '', component: MainComponent},//Главная
  {path: 'catalog', component: CatalogComponent},//Главная
  {path: 'product/:id', component: ProductComponent},//Страница товара
  {path: 'order', component: OrderComponent},//Каталог
  {path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
