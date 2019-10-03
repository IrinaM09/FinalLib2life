import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButton, MatButtonModule } from '@angular/material';

const basic = {
	beforeCodeTitle: 'Vizualizează progresul curățării și extragerii informației din PDF în timp real',
	viewCode: ``,
	isCodeVisible: false,
	isExampleExpanded: true
};

const ELEMENT_DATA: PeriodicElement[] = [
	{ name: 'Corecția gramaticii și \n extragerea notelor de subsol ', progress: '0%', status: 'Neînceput', description: 'Încă nu s-a aplicat corecția textului' },
	{ name: 'Extragerea de Header și \n de Footer', progress: '0%', status: 'Neînceput', description: 'Înca nu s-a început extragerea' },
	{ name: 'Extragerea de imagini', progress: '0%', status: 'Neînceput', description: 'Înca nu s-a început extragerea' },
	{ name: 'Extragerea de tabele', progress: '0%', status: 'Neînceput', description: 'Înca nu s-a început extragerea' },
];

export interface PeriodicElement {
	name: string;
	progress: string;
	status: string;
	description: string;
}

@Component({
	selector: 'kt-administrator',
	templateUrl: './administrator.component.html',
	styleUrls: ['./administrator.component.scss']
})

export class AdministratorComponent implements OnInit, AfterViewInit {

	@ViewChild('wizard', { static: true }) el: ElementRef;

	editor;

	private tinyMceConfig: any;

	private bookName: string;

	private testData: FormData;

	wizard;

	table;

	displayedColumns = ['name', 'progress', 'status', 'description', 'action'];

	dataSource = ELEMENT_DATA;

	submitted = false;

	ngAfterViewInit(): void {
		// Initialize form wizard
		this.wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1,
		});


		// Validation before going to next page
		this.wizard.on('beforeNext', function (wizardObj) {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();
		});

		// Change event
		this.wizard.on('change', function (wizard) {
			setTimeout(function () {
				KTUtil.scrollTop();
			}, 500);
		});

	}

	constructor(private service: ServicesService) {
	}

	ngOnInit() {
		this.configureTinyMce();
		this.table = basic;
		this.bookName = "";
		this.testData = new FormData();
	}

	onSubmit() {
		this.submitted = true;
	}

	onNext() {
		var crtStep = this.wizard.getStep(); 
		
		console.log("step: " + crtStep);

		if (crtStep == 2) {
			this.service.getHtml().subscribe((res) => {
				console.log(res);
				this.editor.setContent(res);

			}, (err: HttpErrorResponse) => {
				console.log("error: " + err);
			});
		}
	}

	startAction(element: String) {
		console.log("Administator. Prelucare: " + element);

		if (element == this.dataSource[0].name) {
			this.dataSource[0].status = "În progres...";

			if (this.sendFormData()) {
				this.dataSource[0].status = "Terminat";
				this.dataSource[0].description = "Corecția gramaticii s-a efectuat cu succes";
			} else {
				this.dataSource[0].status = "Eșec";
				this.dataSource[0].description = "Corecția gramaticii a eșuat";
			}
			// } else if (element == this.dataSource[1].name) {
			// 	this.dataSource[1].status = "În progres...";

			// 	if (this.sendFormData()) {
			// 		this.dataSource[1].status = "Terminat";
			// 		this.dataSource[1].description = "Extracția de Header și de Footer s-a efectuat cu succes";
			// 	} else {
			// 		this.dataSource[1].status = "Eșec";
			// 		this.dataSource[1].description = "Extracția de Header și de Footer a eșuat";
			// 	}
		} else if (element == this.dataSource[2].name) {
			this.dataSource[2].status = "În progres...";

			if (this.getImages()) {
				this.dataSource[2].status = "Terminat";
				this.dataSource[2].description = "Imaginile au fost extrase cu succes";
			} else {
				this.dataSource[2].status = "Eșec";
				this.dataSource[2].description = "Imaginile nu s-au putut extrage";
			}
		} else {
			this.dataSource[3].status = "În progres...";

			if (this.getTables()) {
				this.dataSource[3].status = "Terminat";
				this.dataSource[3].description = "Tabelele au fost extrase cu succes";
			} else {
				this.dataSource[3].status = "Eșec";
				this.dataSource[3].description = "Tabelele nu s-au putut extrage";
			}
		}
	}

	/* Spellchecking service.
		This is also the function that sends the metadata and the file */
	sendFormData() {
		var result = true;

		this.testData.append('bookName', this.bookName);

		console.log("data to send (book name): " + this.testData.get("bookName"));
		console.log("data to send (file): " + this.testData.get("file"));

		this.service.sendFormData(this.testData).subscribe((res) => {
			console.log(res);

		}, (err: HttpErrorResponse) => {
			console.log("error: " + err);
			result = false;
		});

		this.testData = new FormData();

		return result;
	}

	/* Extract Images service */
	getImages() {
		var result = true;

		this.service.getImages().subscribe((res) => {
			console.log(res);

		}, (err: HttpErrorResponse) => {
			console.log("error: " + err);
			result = false;
		});

		return result;
	}

	/* Extract Tables */
	getTables() {
		var result = true;

		this.service.getTables().subscribe((res) => {
			console.log(res);
		}, (err: HttpErrorResponse) => {
			console.log("error: " + err);
			result = false;
		});

		return result;
	}

	/* Încarcă PDF (buton) */
	onFileChange(event) {
		const fileList: FileList = event.target.files;

		if (fileList.length > 0) {
			this.testData.append('file', fileList[0], fileList[0].name);
			console.log(this.testData);
		}
	}

	/* TinyMCE configuration */
	configureTinyMce() {
		this.tinyMceConfig = {
			branding: false,
			plugins: ["advlist autolink lists link image charmap print preview hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code fullscreen",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons template paste textcolor colorpicker textpattern", "toc"],
			height: 550,
			paste_data_images: true,
			image_advtab: true,
			imagetools_toolbar: `
			rotateleft rotateright |
			flipv fliph | 
			editimage imageoptions`,
			importcss_append: !0,
			inline: false,
			menubar: "insert",
			toolbar: `
			insertText insertfile undo redo |
			toc | formateselect |
			bold italic underline strikethrough forecolor backcolor |
			alignleft aligncenter alignright alignjustify |
			bullist numlist outdent indent |
			print preview media"
			removeformat`,
			setup: editor => {
				this.editor = editor;

				editor.on('init', ed => {
					//   ed.target.setContent(this.data.content);
					console.log('editor initialized');
				});
				editor.on('keyup change', () => {
					const content = editor.getContent();
					//   this.data.content = content;
					  this.editor.onEditorContentChange.emit(content);
				});
			}
		};
	}
}
