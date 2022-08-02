export function errorMessage(message) {
    return {
        'status': 400,
        'error': 'Bad Request',
        'message': message
    }
}
