---
title: Phishing & Social-Engineering Detection: Beyond Standard Engines
date: 2026-08-19
short: From phishing to detection: exploring key social engineering techniques and turning them into practical detection rules for the gaps left by standard detection engines.

---

**Phishing.**

It is probably one of the most prominent keywords in the Cyber Security landscape of recent years and can be considered a symbol of the success of social engineering tactics.

Today, everyone is immersed, even involuntarily, in an IT environment. For a company, hiring an employee does not only mean incurring an economic cost related to their activities, but also a **risk cost** associated with their daily operations and the way the person reacts to stimuli, especially when they come from unknown sources.

So, is the employee to blame if they fall victim to a phishing attack? **Yes.**  
Are they solely responsible? **No.**  
In most cases, the company is an integral part of the problem.

During my career as an analyst, I have been able to observe that, very often, **prevention is a more effective defense than simply reacting to an incident**.

Yet, due to a lack of knowledge about the capabilities offered by the available tools or simply because of omissions, prevention is often not properly implemented.

The key points are few, but important:

* **Raise employee awareness:** through white-phishing campaigns, transparency, and information about the types of threats they may encounter. The goal is to make employees aware, rather than simply telling them to “report everything you see to the IT department”.
* **Train the incident response team** on the current state of emerging threats.
* **Generate alerts** for cases that could reveal what prevention missed.
* **Act retrospectively** through targeted hunting queries to identify any compromises or related activities that may have already occurred.

The advent of AI has simplified every stage of the social engineering process: from information gathering to identifying critical figures within the target company; from creating e-mail content capable of bypassing antispam controls to supporting and refining phishing kits already available online.

But AI is not a tool available exclusively to attackers.

It can also be used to **strengthen prevention**, addressing all the key points mentioned above: from writing awareness campaigns to generating queries useful for detecting potentially suspicious e-mails, all the way to supporting training activities.

All of this can be just one prompt and one click away.

The only element that may be missing is the foundation.

Where should I start, concretely, if I want to have prevention queries generated for me?
What topics should I address?
What techniques should I try to detect?

A well-established starting point is MITRE ATT&CK. However, in practice, the need often emerges for more specific detections, tailored to one's own infrastructure and capable of identifying aspects that standard detection engines may overlook.

It is from this need that the idea of collecting and exploring some of the main phishing and social engineering techniques with a detection-oriented approach was born, translating each topic into concrete queries for identifying suspicious activity.
With this in mind, I decided to create a more specific list of Custom Detection Rules that can highlight aspects often overlooked by some detection engines.

> Collection of queries available at this [LINK](https://github.com/keatane/soc-queries/blob/main/social-engineering.kql).  

**#CyberSecurity #Phishing #InformationSecurity #CyberThreats #ThreatDetection #SOC #IncidentResponse #SocialEngineering #MITREATTACK #AI**

------------------ POST

**Phishing is not just a user problem.**

Is the employee to blame when they fall victim to phishing? **Yes.**
Are they solely responsible? **No.**

Prevention cannot be limited to *“report everything to the IT department”*. Awareness, training, detection, and retrospective analysis must be part of the same strategy.

AI is making social engineering increasingly effective, but it can also be used **in favor of defense**: from training to generating queries for identifying suspicious activity.

The question therefore becomes: **where do we start? What should we look for? Which techniques should we detect?**

MITRE ATT&CK is an excellent reference point, but it is often not enough. We need to go down to a more concrete level and build detections **specific to our own infrastructure**.

This need led to the creation of a collection of **Custom Detection Rules** dedicated to phishing and social engineering, with a detection-oriented approach.

I collected the main techniques and translated them into **concrete queries for identifying suspicious activity**.

> > Full article and collection available here: <LINK>

**#CyberSecurity #Phishing #ThreatDetection #SOC #IncidentResponse #SocialEngineering #MITREATTACK #AI**
