import React from "react";

import MetaTags from "../../components/MetaTags.jsx";

import styles from "./legal.module.css";
import OperatorInformation from "./OperatorInformation.jsx";
import OperatorMail from "./OperatorMail.jsx";

export default function PrivacyPolicy({ onHome, onOpenImpressum }) {
	const lastChanged = "11.10.2026";
	return (
		<>
			<MetaTags
				title={"QuizIt Datenschutzerklärung"}
				description={"Datenschutzerklärung der QuizIt-App"}
				author={"Thierry Morgenthaler"}
			/>
			<div className={styles.container}>
				<div className={styles.limiter}>
					{onHome ? (
						<button type="button" className="back-link" onClick={onHome}>
							← Zurück zur App
						</button>
					) : null}
					<h1>Datenschutzerklärung</h1>
					<p>
						<strong>Stand: {lastChanged}</strong>
					</p>
					<h2>1. Verantwortliche Stelle</h2>
					<p> Verantwortlich für die Bearbeitung von Personendaten in QuizIt ist: </p>
					<OperatorInformation />
					<p>
						E-Mail: <OperatorMail />
					</p>
					<h2>2. Allgemeines</h2>
					<p>
						QuizIt ist eine webbasierte Lern-App, mit der bereitgestellte Lernsets bearbeitet und
						Wiederholungsübungen durchgeführt werden können.
					</p>
					<p>
						Der Schutz der Privatsphäre ist uns wichtig. QuizIt wurde so konzipiert, dass die Nutzung ohne
						Benutzerkonto und ohne eine Speicherung von Lernfortschritten oder anderen Nutzerdaten durch
						QuizIt möglich ist.
					</p>
					<p>
						Diese Datenschutzerklärung informiert darüber, welche Daten im Zusammenhang mit der Nutzung der
						Website bearbeitet werden können.
					</p>
					<h2>3. Erhebung und Speicherung von Daten durch QuizIt</h2>
					<p>
						QuizIt verfügt über kein eigenes Backend und keine Datenbank zur Speicherung von Nutzerdaten.
						<br />
						Insbesondere:
					</p>
					<ul>
						<li>werden keine Benutzerkonten erstellt;</li>
						<li>werden keine Lernfortschritte oder Übungsergebnisse dauerhaft gespeichert;</li>
						<li>
							werden keine personenbezogenen Nutzerdaten durch QuizIt in einer eigenen Datenbank
							gespeichert;
						</li>
						<li>
							werden keine Nutzerdaten durch QuizIt in einem eigenen System zu Analyse- oder Werbezwecken
							gespeichert.
						</li>
					</ul>
					<p>Die Nutzung der Lernsets erfolgt grundsätzlich ohne Registrierung.</p>

					<h2>4. Speicherung im Browser</h2>
					<p>
						QuizIt verwendet nach aktuellem Stand keine Cookies, keinen Local Storage und keinen Session
						Storage zur dauerhaften Speicherung von Nutzerdaten auf dem Endgerät.
					</p>
					<p>
						Vorübergehende Daten, die für die Darstellung und Funktion der Website während der Nutzung
						benötigt werden, können im Arbeitsspeicher des Browsers verarbeitet werden. Diese Daten werden
						nicht durch QuizIt dauerhaft gespeichert.
					</p>
					<h2>5. Hosting und technische Zugriffsdaten</h2>
					<p>
						Die Website muss über einen Hosting-Anbieter ausgeliefert werden. Beim Aufruf einer Website
						können technisch notwendige Daten verarbeitet werden, beispielsweise:
					</p>
					<ul>
						<li>IP-Adresse;</li>
						<li>Datum und Uhrzeit des Zugriffs;</li>
						<li>aufgerufene Seite oder angeforderte Datei;</li>
						<li>Informationen über Browser und Betriebssystem.</li>
					</ul>
					<p>
						Ob solche Daten verarbeitet oder in Serverprotokollen gespeichert werden, hängt vom
						Hosting-Anbieter ab.
					</p>
					<p>Contabo stellt die technische Infrastruktur für die Bereitstellung der Website zur Verfügung.</p>
					<p>
						Weitere Informationen zur Datenbearbeitung durch den Hosting-Anbieter finden Sie in dessen
						Datenschutzerklärung:{" "}
						<a href="https://contabo.com/en-us/legal/privacy/">https://contabo.com/en-us/legal/privacy/</a>.
					</p>
					<h2>6. Cookies und Tracking</h2>
					<p>
						QuizIt setzt nach aktuellem Stand keine eigenen Cookies zu Analyse-, Werbe- oder Trackingzwecken
						ein und verwendet keine eigenen Tracking-Dienste.
					</p>
					<p>
						Sollten durch den Hosting-Anbieter, eingebundene Drittanbieter oder künftig ergänzte Funktionen
						Daten mittels Cookies oder vergleichbarer Technologien bearbeitet werden, wird diese
						Datenschutzerklärung entsprechend aktualisiert.
					</p>
					<h2>7. Weitergabe von Daten</h2>
					<p>
						QuizIt verkauft keine personenbezogenen Nutzerdaten und übermittelt keine Nutzerdaten an Dritte
						zu Werbezwecken.
					</p>
					<p>
						Technisch bedingte Datenbearbeitungen durch den Hosting-Anbieter oder andere tatsächlich
						eingesetzte Dienstleister bleiben vorbehalten.
					</p>

					<h2>8. Datensicherheit</h2>
					<p>
						Es werden angemessene technische und organisatorische Massnahmen angestrebt, um die Website und
						die damit verbundenen Datenbearbeitungen vor unbefugtem Zugriff und Missbrauch zu schützen.
					</p>

					<h2>9. Rechte betroffener Personen</h2>
					<p>
						Soweit personenbezogene Daten bearbeitet werden, stehen betroffenen Personen die Rechte zu, die
						ihnen nach dem anwendbaren Datenschutzrecht zustehen. Dazu können insbesondere Auskunfts- und
						gegebenenfalls Berichtigungs- oder Löschungsrechte gehören.
					</p>
					<p>
						Anfragen zum Datenschutz können an <OperatorMail /> gerichtet werden.
					</p>

					<h2>10. Änderungen dieser Datenschutzerklärung</h2>
					<p>
						Diese Datenschutzerklärung kann angepasst werden, wenn sich die technischen Funktionen, die
						eingesetzten Dienstleister oder die rechtlichen Anforderungen ändern.
					</p>
					<p>Es gilt die jeweils auf dieser Website veröffentlichte Fassung.</p>

					<h2>11. Kontakt</h2>
					<p>
						Bei Fragen zum Datenschutz oder zur Bearbeitung personenbezogener Daten können Sie uns unter
						folgender Adresse kontaktieren:
					</p>
					<p>
						E-Mail: <OperatorMail />
					</p>

					<h2>12. Anwendbares Recht</h2>
					<p>
						Diese Datenschutzerklärung richtet sich nach dem anwendbaren Schweizer Datenschutzrecht,
						insbesondere dem Bundesgesetz über den Datenschutz (DSG).
					</p>
					<p> Stand: {lastChanged} </p>
				</div>
			</div>
		</>
	);
}
