import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})

export class SystemComponent implements OnInit {

    sidebar: any;
    closeBtn: any;
    searchBtn: any;

    ngOnInit() {
        this.sidebar = document.getElementsByClassName("sidebar")[0] as HTMLDivElement
        this.closeBtn = document.getElementById("btn")
        this.searchBtn = document.getElementsByClassName("bx-search")[0]

        console.log(this.closeBtn)

        this.closeBtn?.addEventListener("click", () => {
            this.sidebar?.classList.toggle("open");
            this.menuBtnChange();//calling the function(optional)
        });

        this.searchBtn?.addEventListener("click", () => { // Sidebar open when you click on the search iocn
            this.sidebar?.classList.toggle("open");
            this.menuBtnChange(); //calling the function(optional)
        });
    }

    menuBtnChange() {
        if (this.sidebar?.classList.contains("open")) {
            this.closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
        } else {
            this.closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
        }
    }


    constructor(private router: Router) {
    }

    ngOnDestroy(): void {
    }

    goToProfilePage() {
        this.router.navigateByUrl("/system/edit-profile-page")
    }

    logout() {
        this.router.navigateByUrl("")
    }
}
