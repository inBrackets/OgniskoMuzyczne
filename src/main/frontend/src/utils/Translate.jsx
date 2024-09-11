export function translateMonth(monthName) {
    const monthTranslations = {
        January: 'Styczeń',
        February: 'Luty',
        March: 'Marzec',
        April: 'Kwiecień',
        May: 'Maj',
        June: 'Czerwiec',
        July: 'Lipiec',
        August: 'Sierpień',
        September: 'Wrzesień',
        October: 'Październik',
        November: 'Listopad',
        December: 'Grudzień',
    };

    return monthTranslations[monthName] || monthName;
}

export function translateState(state) {
    const stateTranslations = {
        PAID: 'Zapłacone',
        UNPAID: 'Niezapłacone',
    };

    return stateTranslations[state] || state;
}

export function translate(phrase) {
    const otherTranslations = {
        "Number of Lessons": 'Liczba zajęć',
        "Close": 'Zamknij',
        "Payment Status": 'Status zapłaty',
        "Month": 'Miesiąc',
        "To pay": 'Do zapłaty',
        "Add new Subject": 'Dodaj nowe zajęcia',
        "Submit": 'Zatwierdź',
        "Subjects List": "Zajęcia",
        "Payments for year 2024/2025" : 'Wpłaty uczniów Rok szkolny 2024/2025',
        "Teacher name: ": 'Imię i nazwisko nauczyciela: ',
        "Subject: ": 'Zajęcia: ',
        "Price: ": 'Cena: ',
        "Students List": 'Uczniowie',
        "Students name": 'Imię i nazwisko ucznia',
        "Contact": 'Kontakt',
        "Contact: ": 'Dane Kontaktowe: ',
        "Add a student": 'Dodaj ucznia',
        "To Pay": 'Do zapłaty',
        "Change payment status for ": 'Zmień status zapłaty za ',
        "Close": 'Zamknij',
        "Save Changes": 'Zapisz zmiany',
        "Subject name": 'Nazwa przedmiotu',
    };

    return otherTranslations[phrase] || phrase;
}
