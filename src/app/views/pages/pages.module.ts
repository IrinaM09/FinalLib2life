// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { AdministratorComponent  } from './administrator/administrator.component';
import { UserComponent } from './user/user.component';
import { MaterialPreviewModule } from '../partials/content/general/material-preview/material-preview.module';
//Other imports
import { MatTableModule } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
	declarations: [AdministratorComponent, UserComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		UserManagementModule,
		//Other imports
		MatTableModule,
		MaterialPreviewModule,
		EditorModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatRadioModule
	],
	providers: []
})
export class PagesModule {
}
