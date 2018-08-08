import {MatButtonModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

import {MatSelectModule} from '@angular/material/select';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSelectModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSelectModule],
})
export class MaterialModule { }
