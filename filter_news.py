import os
from feedgen.feed import FeedGenerator

def lister_et_trier_fichiers(dossiers):
    files = []
    
    # Parcourir chaque dossier spécifié
    for dossier in dossiers:
        for racine, _, fichiers in os.walk(dossier):
            for fichier in fichiers:
                if fichier.endswith('.md'):
                    chemin_fichier = os.path.join(racine, fichier)
                    files.append(chemin_fichier)

    # Trier par ordre naturel (par exemple, ordre alphabétique des noms de fichiers)
    files.sort()

    # Sélectionner les derniers fichiers (les derniers découverts)
    latest_files = files[-5:]  # Sélectionner les 5 derniers fichiers

    return latest_files

def generer_flux_rss(file_paths):
    fg = FeedGenerator()
    fg.title('Dernières news')
    fg.link(href='http://localhost:8000/rss', rel='self')
    fg.description('Les 5 dernières news')

    # Ajouter chaque fichier en tant qu'entrée RSS
    for file_path in file_paths:
        filename = os.path.basename(file_path)
        folder_name = os.path.basename(os.path.dirname(file_path))
        fe = fg.add_entry()
        fe.title(filename)
        fn = filename.split('.md')[0]
        fe.link(href=f'http://localhost:8000/Informations/News/{folder_name}/{fn}/')
        # Ajouter une description ou d'autres métadonnées si nécessaire

    # Générer le flux RSS
    rss_feed = fg.rss_str(pretty=True)

    # Convertir rss_feed en une chaîne de caractères (str) explicitement
    rss_feed_str = rss_feed.decode('utf-8') if isinstance(rss_feed, bytes) else rss_feed

    # Écrire le flux RSS dans un fichier en mode texte ('w')
    with open('docs/latest_news.xml', 'w', encoding='utf-8') as f:
        f.write(rss_feed_str)

if __name__ == "__main__":
    # Spécifiez les dossiers à parcourir
    dossiers = [
        'docs/Informations/News/202501',
        'docs/Informations/News/202407',
        'docs/Informations/News/202406'
    ]
    
    latest_files = lister_et_trier_fichiers(dossiers)
    generer_flux_rss(latest_files)
