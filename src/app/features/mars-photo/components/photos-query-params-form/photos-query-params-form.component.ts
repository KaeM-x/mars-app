import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotosQueryParams } from '../../models/photos-query-params.model';

@Component({
  selector: 'photos-query-params-form',
  templateUrl: './photos-query-params-form.component.html',
  styleUrls: ['./photos-query-params-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class PhotosQueryParamsFormComponent implements OnInit {
  @Input()
  set initialQueryParams(params: PhotosQueryParams) {
    if (this.queryForm) {
      this.queryForm.patchValue(params, { emitEvent: false });
    } else {
      this._initialQueryParams = params;
    }
  }
  private _initialQueryParams: PhotosQueryParams = { sol: 1000, page: 1, camera: "FHAZ" };

  @Output() queryParamsChanged = new EventEmitter<Partial<PhotosQueryParams>>();

  public queryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.queryForm = this.fb.group({
      sol: [this._initialQueryParams.sol, [Validators.required, Validators.min(0)]],
      camera: [this._initialQueryParams.camera || null],
      page: [this._initialQueryParams.page, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this._initialQueryParams && this.queryForm.value.sol !== this._initialQueryParams.sol) {
      this.queryForm.patchValue(this._initialQueryParams, { emitEvent: false });
    }

    this.queryForm.get('camera')?.valueChanges.subscribe(() => {
      this.queryForm.get('page')?.setValue(1, { emitEvent: false });
    });
  }

  onSubmit(): void {
    if (this.queryForm.valid) {
      const formValues: PhotosQueryParams = this.queryForm.value;

      const cleanedValues: Partial<PhotosQueryParams> = {
        sol: formValues.sol,
        page: formValues.page,
        camera: formValues.camera
      };

      this.queryParamsChanged.emit(cleanedValues);
    } else {
      this.queryForm.markAllAsTouched();
      console.warn('The form is invalid. Please correct the errors.');
    }
  }

  onReset(): void {
    const defaultValues: PhotosQueryParams = { sol: 1000, page: 1, camera: "FHAZ" };
    this.queryForm.patchValue(defaultValues);
    this.onSubmit();
  }

  onPageChange(increment: number): void {
    const currentPage = this.queryForm.get('page')?.value || 1;
    const newPage = Math.max(1, currentPage + increment);
    this.queryForm.get('page')?.setValue(newPage);
    this.onSubmit();
  }
}