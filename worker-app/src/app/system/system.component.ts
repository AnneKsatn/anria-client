import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit {
    // showFiller = false;
    assignments: any = []
    

    mobileQuery: MediaQueryList;

    fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

    fillerContent = Array.from(
        { length: 50 },
        () =>
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    );

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef, 
        media: MediaMatcher,
        private firestore: AngularFirestore,
        private router: Router
        ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        this.firestore.collection("assignments", ref => ref.where("worker_id", "==", "2R1BEiD1pMx3jKfGeHLV"))
        .snapshotChanges().subscribe((data: any) => {
            this.assignments = data.map(function(assignment: any) {
                return {
                    "date_end": assignment.payload.doc.data().date_end,
                    "date_start": assignment.payload.doc.data().date_start,
                    "task_id": assignment.payload.doc.data().task_id,
                    "task_title": assignment.payload.doc.data().task_title,
                    "id": assignment.payload.doc.id,
                }
            })

            console.log(this.assignments)
        })
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    goToAssignment(id: any) {
        this.router.navigate(["/system/assignment"],  {queryParams: {id: id}})
    }

    shouldRun = true
}
