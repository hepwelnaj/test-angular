import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() itemsPerPageChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() itemsPerPageOptions: number[] = [5, 10, 20];
    pages: number[] = [];
    totalPages: number = 0;

    public ngOnInit() {
        this.updatePages();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['totalItems']) {
            this.updatePages();
        }
    }

    private updatePages() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    }

    public goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.pageChange.emit(this.currentPage);
        }
    }

    public onItemsPerPageChange(event: any) {
        const newItemsPerPage = (event as HTMLSelectElement).value
        this.itemsPerPage = +newItemsPerPage;
        this.itemsPerPageChange.emit(this.itemsPerPage);
        this.currentPage = 1;
        this.updatePages();
    }
}
