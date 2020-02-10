export default function ({ store, redirect, app }) {
  // If the user is not authenticated
  if (!store.state.auth.jwt) {
    return redirect(app.localePath('login'));
  }
}