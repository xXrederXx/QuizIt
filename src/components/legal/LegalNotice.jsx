import React from "react";

import MetaTags from "../../components/MetaTags.jsx";

import styles from "./legal.module.css";
import OperatorInformation from "./OperatorInformation.jsx";
import OperatorMail from "./OperatorMail.jsx";

export default function LegalNotice({ onHome, onOpenPrivacy }) {
	const lastChanged = "11.10.2026";
	return (
		<>
			<MetaTags
				title={"QuizIt Impressum"}
				description={"Impressum der QuizIt-App"}
				author={"Thierry Morgenthaler"}
			/>
			<div className={styles.container}>
				<div className={styles.limiter}>
					{onHome ? (
						<button type="button" className="back-link" onClick={onHome}>
							← Zurück zur App
						</button>
					) : null}
					<h1>Impressum</h1>
					<h2>Betreiber</h2>
					<OperatorInformation />
					<h2>Kontakt</h2>
					<p>
						E-Mail: <OperatorMail />
					</p>

					<h2>Verantwortlich für den Inhalt</h2>
					<OperatorInformation />
					<h2>Hinweis zur Plattform</h2>
					<p>
						QuizIt ist eine selbst entwickelte Studien-App, mit der Lernsets bearbeitet und
						Wiederholungsübungen in verschiedenen Modi unterstützt werden.
					</p>
					<h2>Haftung für Inhalte</h2>
					<p>
						Die Inhalte der Lernsets werden von der Betreiberin bzw. dem Betreiber von QuizIt
						bereitgestellt. Die Lernsets dienen ausschliesslich zu Lern- und Übungszwecken.
					</p>
					<p>
						Die Inhalte werden mit angemessener Sorgfalt erstellt und überprüft. Dennoch kann keine Gewähr
						für die Richtigkeit, Vollständigkeit, Aktualität oder Fehlerfreiheit sämtlicher Inhalte
						übernommen werden. Insbesondere können sich fachliche Fehler, unvollständige Angaben oder
						veraltete Informationen nicht vollständig ausschliessen lassen.
					</p>
					<p>
						Die Nutzung der Lernsets erfolgt eigenverantwortlich. Die Lernsets ersetzen keine verbindlichen
						Lehrmittel, offiziellen Prüfungsunterlagen oder fachliche Beratung. Nutzerinnen und Nutzer
						sollten wichtige Angaben anhand geeigneter und verlässlicher Quellen überprüfen.
					</p>
					<h2>Haftung für die Nutzung und Verfügbarkeit</h2>
					<p>
						Die Betreiberin bzw. der Betreiber bemüht sich um einen zuverlässigen Betrieb von QuizIt, kann
						jedoch keine jederzeitige und unterbrechungsfreie Verfügbarkeit garantieren. Technische Fehler,
						Unterbrechungen oder Datenverluste können nicht vollständig ausgeschlossen werden.
					</p>
					<p>
						Soweit gesetzlich zulässig, wird die Haftung für Schäden ausgeschlossen, die aus der Nutzung
						oder Nichtverfügbarkeit von QuizIt oder aus dem Vertrauen auf fehlerhafte, unvollständige oder
						veraltete Lerninhalte entstehen. Zwingende gesetzliche Haftung bleibt vorbehalten.
					</p>
					<h2>Meldung von Fehlern</h2>
					<p>
						Hinweise auf fehlerhafte oder unvollständige Lerninhalte können über <OperatorMail /> gemeldet
						werden. Gemeldete Fehler werden nach Möglichkeit geprüft und gegebenenfalls korrigiert.
					</p>
					<h2>Datenschutz</h2>
					<p>
						Informationen zur Bearbeitung von Personendaten finden Sie in unserer{" "}
						<button type="button" className="text-link" onClick={onOpenPrivacy}>
							Datenschutzerklärung
						</button>
						.
					</p>
					<p> Stand: {lastChanged} </p>
				</div>
			</div>
		</>
	);
}
