const contenu = document.querySelector("#contenu");
const li = document.querySelectorAll("li.nav-item.dropdown");

/* Gestion de l'opacité du contenu */

li.forEach((o) => {
    o.addEventListener("mouseenter", () => {
        contenu.style.opacity = "0.5"; 
    });
    o.addEventListener("mouseleave", () => {
        contenu.style.opacity = "1"; 
    });
});

/* Pour les formulaires */

let horaires= [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
];

function Horaire(){
    const selectHoraireDebut= document.querySelector("#inputHoraireDeb");
    const selectHoraireFin= document.querySelector("#inputHoraireFin");
    horaires.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectHoraireDebut.appendChild(option);
    });
    horaires.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectHoraireFin.appendChild(option);
    })
}

let laboratoires= [
    "CIRI - U1111 UMR5308",
    "CRAL - UMR 5574",
    "EVS - UMR 5600",
    "ICBMS - UMR 5246",
    "ICJ - UMR 5208",
    "IGFL - UMR 5242",
    "IHRIM - UMR 5317",
    "ILM - UMR 5306 (MMCI)",
    "ILM - UMR 5306 (PT)",
    "ISA - UMR 5280",
    "LBMC - UMR 5239",
    "LCH - UMR 5182",
    "LIP - UMR 5668",
    "LMFA-ECL - UMR C5509",
    "LMFA-Lyon1 - UMR C5509",
    "LMFA-INSA - UMR C5509",
    "LPH - UMR 5672",
    "LGL - UMR 5276",
    "RDP - UMR 5667",
    "UMPA - UMR 5669",
    "CRMN - FRE 3008",
    "IBCP - FR 3302",
    "CBP",
    "IXXI",
    "PALGEN",
    "CSSI"
];

function Laboratoire(){
    const selectLabo= document.querySelector('#inputLabo');
    laboratoires.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectLabo.appendChild(option);
    })
}

const demandes=[
    "Accès général aux ressources",
    "Création d'un espace projet",
    "Création d'un groupe d'utilisateurs",
    "Assistance technique",
    "Privatisation d'un équipement",
    "Exploitation d'un plateau technique",
    "Installation de logiciel",
    "Qualification de matériel",
    "Animation 3IP",
    "Création Paillasse numérique",
    "Formation ressources CBP",
    "Prise en main SIDUS",
    "Extension de quota"
];

function Demande(){
    const selectDemande= document.querySelector("#inputDemande");
    demandes.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectDemande.appendChild(option);
    })
}

const plateaux=[
    "multi-noeuds (MPI)",
    "multi-coeurs (MPI,OpenMP,OpenCL)",
    "multi-shaders (GPU avec CUDA, OpenCL, Kokkos, OpenACC)",
    "Salle 3IP",
    "Compute On My Own Device",
    "Galaxy",
    "Forge",
    "intégration (Ubuntu, Centos, Debian)"
];

function Plateau(){
    const selectPlateau= document.querySelector("#inputPlateau");
    plateaux.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectPlateau.appendChild(option);
    })
}

const entités=[
    "Laboratoire Monod",
    "Laboratoire Descartes",
    "Département Monod",
    "Département Descartes",
    "Entité hors ENS-Lyon"
];

function Entité(){
    const selectEntité= document.querySelector("#inputEntite");
    entités.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectEntité.appendChild(option);
    })
}

const statutAdmins=[
    "Professeur",
    "MCF",
    "DR",
    "CR",
    "AGPR",
    "IGR",
    "Post-Doc",
    "Etudiant"
];

function StatutAdmin(){
    const selectStatut= document.querySelector("#inputStatutAdmin");
    statutAdmins.map((o) => {
        const option= document.createElement("option");
        option.value= o;
        option.textContent= o;
        selectStatut.appendChild(option);
    })
}

document.addEventListener('DOMContentLoaded', function() {
    
    if (document.querySelector('#inputHoraireDeb') && document.querySelector("#inputHoraireFin")) {
        Horaire();
    }
    if (document.querySelector('#inputLabo')) {
        Laboratoire();
    }
    if (document.querySelector('#inputDemande')) {
        Demande();
    }
    if (document.querySelector('#inputPlateau')) {
        Plateau();
    }
    if (document.querySelector('#inputEntite')) {
        Entité();
    }
    if (document.querySelector('#inputStatutAdmin')) {
        StatutAdmin();
    }
});

/* Pour que les sous-menus puissent s'ouvrir en cliquant */

document.addEventListener('DOMContentLoaded', function() {
    var dropdowns_menu = document.querySelectorAll('.dropdown-menu');

    dropdowns_menu.forEach(function(dropdown) {
        dropdown.addEventListener('click', function(event) {
            event.stopPropagation();
            var parent = this.closest('.dropdown-menu');
            if (parent) {
                parent.classList.add('show');
                parent.parentElement.querySelector('.nav-link').setAttribute('aria-expanded', 'true');
            }
        });
    });
});

/* Sur ordinateur pour que lorsqu'on clique sur un menu, il se ferme quand on en sort */

document.addEventListener('DOMContentLoaded', function() {

    var md = new MobileDetect(window.navigator.userAgent);

    if (!md.tablet() && !md.mobile()) {
        
        var navItemsDropdown = document.querySelectorAll('.nav-item.dropdown');
        var navItemsDropend = document.querySelectorAll('.nav-item.dropend');

        navItemsDropdown.forEach(function(navItem) {
            gestionDrop(navItem, navItemsDropdown);
        });

        navItemsDropend.forEach(function(navItem) {
            gestionDrop(navItem, navItemsDropend);
        });

        function gestionDrop(navItem, nav) {
            var dropdown_menu = navItem.querySelector('.dropdown-menu');
            var dropdown_toggle = navItem.querySelector('.dropdown-toggle');

            if (dropdown_menu) {
                navItem.addEventListener('mouseleave', function() {
                        closeAll(nav);
                });

                dropdown_menu.addEventListener('mouseleave', function() {
                        closeAll(nav);
                });
                
                navItem.addEventListener('click', function(event) {
                    event.stopPropagation();
                    closeAll(nav); // Fermer tous les menus avant d'ouvrir le nouveau
                    dropdown_toggle.classList.toggle('show');
                    dropdown_menu.classList.toggle('show');
                    dropdown_menu.setAttribute("aria-expanded", dropdown_menu.classList.contains('show'));
                });
            }
        }

        function closeAll(drop) {
            drop.forEach(function(navItem) {
                var dropdown_menu = navItem.querySelector('.dropdown-menu');
                if (dropdown_menu) {
                    dropdown_menu.classList.remove('show');
                    dropdown_menu.setAttribute("aria-expanded", false);
                }
            });
        }
    }
});