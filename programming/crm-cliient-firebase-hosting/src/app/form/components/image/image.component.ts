import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileFire } from 'src/app/server/firebase/FilleFire.class';
import { ServerService } from 'src/app/server/services/server.service';
import { FileForm } from '../../models/fileForm.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})

export class ImageComponent implements OnInit {

  @Input() fileForm: { key: string, value: FileForm }
  @Output() InputFile: EventEmitter<{ name: string, file: FileFire }>

  imageSrc: string;
  readonly: boolean;

  constructor(private server :ServerService) {
    this.InputFile = new EventEmitter<{ name: string, file: FileFire }>();
  }

  ngOnInit(): void {
    this.reset();
  }

  inputFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => this.imageSrc = e.target.result;
      this.InputFile.emit({ name: this.fileForm.key, file: new FileFire(file) });
    }
  }

  reset() {
    this.imageSrc = this.fileForm.value.src;
    this.readonly = this.fileForm.value.readonly;
    delete this.fileForm.value.fileFire;
  }
}
