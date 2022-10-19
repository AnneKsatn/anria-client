'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">admin-panel documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' : 'data-target="#xs-components-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' :
                                            'id="xs-components-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' : 'data-target="#xs-injectables-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' :
                                        'id="xs-injectables-links-module-AppModule-5ba2248a0782198d23ffb3ee9c80097f2311a608f39b2f6046e64fca40d91d0195fb9a7900acdc672f4671b63b2547c38e119a98eb491ae0a94a98edb9c687fc"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-f749839e0850f4bd31edfd01e0faa3333a0644c189dc8c1b57ea0edad41e51e06c9517a1a5c95e75559620117fe19f8f6aa9670fd65df698396789e4c769f220"' : 'data-target="#xs-components-links-module-AuthModule-f749839e0850f4bd31edfd01e0faa3333a0644c189dc8c1b57ea0edad41e51e06c9517a1a5c95e75559620117fe19f8f6aa9670fd65df698396789e4c769f220"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-f749839e0850f4bd31edfd01e0faa3333a0644c189dc8c1b57ea0edad41e51e06c9517a1a5c95e75559620117fe19f8f6aa9670fd65df698396789e4c769f220"' :
                                            'id="xs-components-links-module-AuthModule-f749839e0850f4bd31edfd01e0faa3333a0644c189dc8c1b57ea0edad41e51e06c9517a1a5c95e75559620117fe19f8f6aa9670fd65df698396789e4c769f220"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompanyLoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistrationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SystemModule.html" data-type="entity-link" >SystemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SystemModule-8b36d1d1142a99b28b4ca6753ab149b30deab3ece2784ee6f459796778a5fbb7e9ab25a9b44487992c033ec9611e77882cb3a43f3f5825eca6eca038a09a7395"' : 'data-target="#xs-components-links-module-SystemModule-8b36d1d1142a99b28b4ca6753ab149b30deab3ece2784ee6f459796778a5fbb7e9ab25a9b44487992c033ec9611e77882cb3a43f3f5825eca6eca038a09a7395"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SystemModule-8b36d1d1142a99b28b4ca6753ab149b30deab3ece2784ee6f459796778a5fbb7e9ab25a9b44487992c033ec9611e77882cb3a43f3f5825eca6eca038a09a7395"' :
                                            'id="xs-components-links-module-SystemModule-8b36d1d1142a99b28b4ca6753ab149b30deab3ece2784ee6f459796778a5fbb7e9ab25a9b44487992c033ec9611e77882cb3a43f3f5825eca6eca038a09a7395"' }>
                                            <li class="link">
                                                <a href="components/AddStepPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddStepPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddWorkerPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddWorkerPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssignTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssignmentInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignmentInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssingmentIngoPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssingmentIngoPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssingmentsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssingmentsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogAddTaskComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogAddTaskComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditProfilePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditProfilePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocalizationPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalizationPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StepInfoPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StepInfoPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StepPhotoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StepPhotoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SystemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SystemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TaskInfoPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskInfoPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TasksPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserActivityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserActivityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInfoPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfoPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserOnboardingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserOnboardingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SystemRoutingModule.html" data-type="entity-link" >SystemRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Step.html" data-type="entity-link" >Step</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AssignmentService.html" data-type="entity-link" >AssignmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StepService.html" data-type="entity-link" >StepService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Animal.html" data-type="entity-link" >Animal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PeriodicElement.html" data-type="entity-link" >PeriodicElement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});