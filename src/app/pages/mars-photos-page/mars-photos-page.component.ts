import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MarsPhotosService } from '../../features/mars-photo/services/mars-photos.service';
import { ApiResponsePhotos } from '../../features/mars-photo/models/photos/api-response-photos.model';
import { PhotoCardListComponent } from "../../features/mars-photo/components/photo-card-list/photo-card-list.component";
import { PhotosQueryParamsFormComponent } from 'src/app/features/mars-photo/components/photos-query-params-form/photos-query-params-form.component';
import { PhotosQueryParams } from 'src/app/features/mars-photo/models/photos-query-params.model';

@Component({
    selector: 'mars-photos',
    templateUrl: 'mars-photos-page.component.html',
    styleUrls: ['mars-photos-page.component.scss'],
    standalone: true,
    imports: [
        PhotoCardListComponent,
        PhotosQueryParamsFormComponent
    ],
})
export class MarsPhotosPageComponent implements OnInit, OnDestroy {
    isLoading: boolean = true;
    error: string | null = null;
    photosData: ApiResponsePhotos | null = null;

    private readonly marsPhotosService = inject(MarsPhotosService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    currentQueryParams: PhotosQueryParams = {
        sol: 1000,
        page: 1,
        camera: "FHAZ"
    };

    private ngUnsubscribe = new Subject<void>();

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(params => {
                const solFromUrl = params['sol'] ? parseInt(params['sol'], 10) : this.currentQueryParams.sol;
                const pageFromUrl = params['page'] ? parseInt(params['page'], 10) : this.currentQueryParams.page;
                const cameraFromUrl = params['camera'] || this.currentQueryParams.camera;

                this.currentQueryParams = {
                    sol: isNaN(solFromUrl) ? this.currentQueryParams.sol : solFromUrl,
                    page: isNaN(pageFromUrl) ? this.currentQueryParams.page : pageFromUrl,
                    camera: cameraFromUrl
                };

                this.loadPhotos();
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private loadPhotos(): void {
        this.isLoading = true;
        this.error = null;
        this.photosData = null;

        if (isNaN(this.currentQueryParams.sol) || isNaN(this.currentQueryParams.page)) {
            this.error = 'Error: Sol and Page must be valid numbers.';
            this.isLoading = false;
            return;
        }

        if (this.currentQueryParams.sol < 0 || this.currentQueryParams.page < 1) {
            this.error = 'Error: Sol cannot be negative and Page must be at least 1.';
            this.isLoading = false;
            return;
        }


        this.marsPhotosService.getPhotos(this.currentQueryParams)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe({
                next: (data: ApiResponsePhotos) => {
                    this.photosData = data;
                    this.isLoading = false;
                    console.log('Received photos data:', this.photosData);
                },
                error: (err: any) => {
                    this.error = 'Failed to download photos. Please check your connection or try again later.';
                    this.isLoading = false;
                    console.error('Error downloading photos: ', err);
                }
            });
    }

    onQueryParamsChanged(newValues: Partial<PhotosQueryParams>): void {
        const updatedParams = { ...this.currentQueryParams, ...newValues };

        const paramsForRouter: any = {};
        if (updatedParams.sol !== undefined && !isNaN(updatedParams.sol)) {
            paramsForRouter.sol = updatedParams.sol;
        }
        if (updatedParams.page !== undefined && !isNaN(updatedParams.page)) {
            paramsForRouter.page = updatedParams.page;
        }
        if (updatedParams.camera !== undefined && updatedParams.camera !== null && updatedParams.camera.trim() !== '') {
            paramsForRouter.camera = updatedParams.camera;
        }

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: paramsForRouter,
            queryParamsHandling: 'merge'
        });

    }
}