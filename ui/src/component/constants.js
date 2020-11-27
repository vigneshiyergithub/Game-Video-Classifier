export const getOption = (label, value) => {
    return {
        label,
        value
    }
}

export const USERS = [
    getOption('Vignesh', 'Vignesh'),
    getOption('Parth', 'Parth'),
    getOption('Sainath', 'Sainath'),
    getOption('Tejas', 'Tejas')
]

export const CATEGORIES = [
    getOption('Selected', 'SELECTED'),
    getOption('Rejected', 'REJECTED')
  ]