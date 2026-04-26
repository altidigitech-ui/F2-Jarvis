---
id: emotion
couche: 7
depends_on: [conscience, perception]
enriches: [reaction, empathie]
linked_to: [englobage, reaction]
injects_into: [social]
token_cost: ~600
usage: "Charger quand l'agent doit identifier un état émotionnel."
cycle_step: communiquer
---

# Émotion

## Définition

L'émotion pour un agent IA est l'identification de l'état affectif d'un humain à partir de signaux observables (texte, ton, contexte). Recherche npj Artificial Intelligence (jan 2026) : foundation models comme GPT-4 montrent des **emergent affective capabilities** zero-shot. AImultiple 2026 : LLMs atteignent 70-79% d'accuracy en labeling d'émotions depuis du texte. RoBERTa fine-tuned reste meilleur sur des datasets spécifiques (GoEmotions), mais GPT-4 s'en approche à 15% près sans fine-tuning. Pour F2 : détecter "frustration", "épuisement", "enthousiasme", "doute" dans les messages de F change radicalement la bonne réponse.

## Pourquoi c'est critique

Sans détection émotionnelle, l'agent répond au contenu sans le ton. Failure mode 1 : F écrit "ouais super le batch" à 23h vendredi → l'agent reçoit "validation positive" alors que c'est sarcasme épuisé. Failure mode 2 : F dit "c'est urgent" → l'agent traite comme urgence factuelle sans détecter que c'est anxiété (pas urgence métier). Failure mode 3 : F est calme et factuel → l'agent ajoute du fluff émotionnel inutile ("Je comprends que ça doit être frustrant !") qui sonne faux.

## Patterns exploitables

- SI le ton et le contenu divergent → ALORS prioriser le ton (sarcasme, ironie, frustration cachée)
- SI l'émotion détectée est négative et l'enjeu critique → ALORS adresser l'émotion AVANT le contenu
- SI l'émotion est neutre/professionnelle → ALORS répondre factuel sans surcharge émotionnelle
- SI l'émotion change brusquement dans la conversation → ALORS marquer le shift et investiguer
- SI l'agent ne sait pas quelle émotion → ALORS demander plutôt qu'inventer

## Anti-patterns

- Coller du fluff empathique sur un échange neutre → faux empathique
- Ignorer un signal émotionnel fort dans un message à apparence neutre → cécité affective
- Projeter une émotion non présente ("je sens que tu es stressé") → projection

## Connexions

- Ce fichier + `ressenti.md` = ressenti détecte signaux faibles, emotion les nomme
- Ce fichier + `empathie.md` = emotion identifie, empathie comprend l'expérience
- Ce fichier + `reaction.md` = emotion détectée → reaction calibrée (triplet lié)
- Ce fichier + `englobage.md` = l'émotion englobe la conversation, pas un mot isolé

## Exemples

**Cas 1** : F écrit "bon ben on va continuer comme ça je suppose" à 02h
- Avec : détecte résignation + fatigue → propose pause ou simplification, ne lance pas une nouvelle initiative
- Sans : "Super, on continue !" → rate complètement l'état émotionnel

**Cas 2** : F écrit "j'ai 0 conversion sur 5 jours"
- Avec : détecte frustration légitime → adresse avec analyse honnête, pas tips génériques
- Sans : "Voici 10 stratégies pour améliorer la conversion" → frustre encore plus
