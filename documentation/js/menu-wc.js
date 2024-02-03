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
                    <a href="index.html" data-type="index-link">nest_project documentation</a>
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' :
                                            'id="xs-controllers-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' :
                                        'id="xs-injectables-links-module-AppModule-d832d03ac8661ad4722dae41925e1cb8546654302b9404da34959c4c568c523cccbe28021a9563c27856e2ba0329f82f7f9b568e458689c689c155400b0edf3a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' :
                                            'id="xs-controllers-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' :
                                        'id="xs-injectables-links-module-AuthModule-a4d7d9844580283c94fbf3c1ac46a1e97f6992dac0d3be68e746821f8ff57181d934e7dd19c0495c8823fa53dbf1f3650a1179d9ea6ede6df6d3687fc468fd72"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' :
                                            'id="xs-controllers-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' :
                                        'id="xs-injectables-links-module-CompaniesModule-b68d2f4e3436c2d77ae4ed387d5f9dfaa4a5d87158e8f6be229af1a313a65afee59b3b69f4e48450ead770f6faf8f685751ba85b0774f8e19f8665783e08c325"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' :
                                            'id="xs-controllers-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' :
                                        'id="xs-injectables-links-module-DatabasesModule-c8fcd8628c3b7a50c4619f537f4a11f228a209cc66b667e40232af0df77e1ce68bb62b7127e7f758541875fe51568686d5e5c8ebb7ba9ce0ac782950a8b0f54e"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' :
                                            'id="xs-controllers-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' :
                                        'id="xs-injectables-links-module-FilesModule-fd423b16d4dbb972486bc9b2b47caec2802b54ac4134c2dd7492b5085fd30f04cb0b4d6fa13881fde21c34c115b78a2efd06ef4670f482d6a8f14dcda4773d1b"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' :
                                            'id="xs-controllers-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' :
                                        'id="xs-injectables-links-module-JobsModule-2d991847c19b73917314d7c1f59114d85de5df8d177e93ab32a168e10b50a802ffcaccf3ad1371d9181923bbb013e528b2ab6e46e1d69ec13eb5406d6860ad3a"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailerModule.html" data-type="entity-link" >MailerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' : 'data-bs-target="#xs-controllers-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' :
                                            'id="xs-controllers-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' }>
                                            <li class="link">
                                                <a href="controllers/MailerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' : 'data-bs-target="#xs-injectables-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' :
                                        'id="xs-injectables-links-module-MailerModule-0b04967971f2c9a00b0a76e89256bacf5d59e3cb27badf1c0acdca7d13d3be74fe30084596090af56ba9426209ead58311eb3d39646c63f5fbba803250b323b5"' }>
                                        <li class="link">
                                            <a href="injectables/MailerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionModule.html" data-type="entity-link" >PermissionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' : 'data-bs-target="#xs-controllers-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' :
                                            'id="xs-controllers-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' : 'data-bs-target="#xs-injectables-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' :
                                        'id="xs-injectables-links-module-PermissionModule-aaa680538db1ad8c67c59bc0da366b584105cdddb994e878493b2e9f7953570fc02f20f3997d398fea80989c5060606bed6ab8a7a90929bcc2b664a03ca5d864"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' :
                                            'id="xs-controllers-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' :
                                        'id="xs-injectables-links-module-ResumesModule-be59fd71bb28aa892442f73104bc883c0e7229e436c4f9a864701a4791aa89b759cf7dd5aeffc6e2f682c322ecf0bd3d820241f57c00e482db6fcc7a28038fc0"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' :
                                            'id="xs-controllers-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' :
                                        'id="xs-injectables-links-module-RolesModule-aedb80c611443cec2e8fb141b460a1cb5f527f40b09a1789ee9e8bfc9b4430b55f275c72e1c5024fc8c22a6fe62080b9e627b926271638bd4f02ce82737c71b1"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' :
                                            'id="xs-controllers-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' :
                                        'id="xs-injectables-links-module-SubscribersModule-bd432ece1dfb98fd7ba3c43b20fb7c420c932bbe9a987ff2dfbed98eef7611ad9b490c2e789f540cb64c7f8c9b19fb9995c3ce54183c3403c42a67bf27f1ef70"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' : 'data-bs-target="#xs-controllers-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' :
                                            'id="xs-controllers-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' : 'data-bs-target="#xs-injectables-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' :
                                        'id="xs-injectables-links-module-UserModule-9cd559339f0a77263917a278136ce4c76f32fbb3bad711b4532bb3f2791cb7d224e8deb97387de34dfa067cf459ce125d31f44008844b90c1f18e0947949fd01"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailerController.html" data-type="entity-link" >MailerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionController.html" data-type="entity-link" >PermissionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserDto.html" data-type="entity-link" >DeleteUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorHandlerInterceptor.html" data-type="entity-link" >ErrorHandlerInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailerService.html" data-type="entity-link" >MailerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseObjectIDPipe.html" data-type="entity-link" >ParseObjectIDPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionService.html" data-type="entity-link" >PermissionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DataQueryResponse.html" data-type="entity-link" >DataQueryResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HistoryResume.html" data-type="entity-link" >HistoryResume</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailSender.html" data-type="entity-link" >IMailSender</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationQueryOptions.html" data-type="entity-link" >PaginationQueryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserType.html" data-type="entity-link" >UserType</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});