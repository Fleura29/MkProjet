import os

def inclure_contenu(fichier):
    with open(fichier, 'r', encoding='utf-8') as f:
        return f.read()

def lire_tous_les_fichiers_par_ordre_inverse(dossiers):
    contenu_total = ""
    
    contenu_total += "<!-- Ne pas modifier, généré automatiquement -->\n"
    contenu_total += "# Fil des news\n\n"
    contenu_total += "<a href='../../latest_news.xml' download='news.xml'>S'abonner au fil des news (flux RSS)</a> \n\n"

    # Parcourir les dossiers dans l'ordre spécifié
    for dossier in dossiers:
        for racine, _, fichiers in os.walk(dossier):
            fichiers.reverse()  # Inverser l'ordre des fichiers dans chaque dossier
            for nom_fichier in fichiers:
                if nom_fichier.endswith('.md'):
                    chemin_fichier = os.path.join(racine, nom_fichier)
                    contenu_total += inclure_contenu(chemin_fichier) + "\n\n"

    return contenu_total

def ecrire_contenu_principal(contenu, fichier_sortie):
    with open(fichier_sortie, 'w', encoding='utf-8') as f:
        f.write(contenu)

# Spécifiez l'ordre des dossiers à inclure
dossiers = [
    'docs/Informations/News/202501',
    'docs/Informations/News/202407',
    'docs/Informations/News/202406'
]

# Lire le contenu de tous les fichiers Markdown dans les dossiers spécifiés, avec inversion de l'ordre des fichiers
contenu_total = lire_tous_les_fichiers_par_ordre_inverse(dossiers)

# Spécifiez le fichier Markdown principal où inclure le contenu
fichier_principal = 'docs/Informations/News.md'

# Écrire le contenu total dans le fichier principal
ecrire_contenu_principal(contenu_total, fichier_principal)

print(f"Le contenu des fichiers dans '{dossiers}' a été inclus dans '{fichier_principal}' dans l'ordre inversé.")
