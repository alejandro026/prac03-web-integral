import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';

const myMpdules: any=[
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatGridListModule,
  ReactiveFormsModule,
  MatToolbarModule
];


@NgModule({
  declarations: [],
  imports: [
    ...myMpdules
  ],
  exports:[
    ...myMpdules
  ]
})
export class MaterialModule { }
