import {MatButtonModule, MatInputModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

import {MatSelectModule} from '@angular/material/select';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSelectModule, MatDividerModule, MatInputModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSelectModule, MatDividerModule, MatInputModule],
})
export class MaterialModule { }
