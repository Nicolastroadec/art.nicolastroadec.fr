export default function page() {
    return (<form className="flex justify-center items-center h-lvh w-full flex-col">
        <label htmlFor="username">Utilisateur</label>
        <input className="rounded-xl border-solid border-gray-400 p-2 border-2 text-black mb-4" type="text" id="username" name="username" required />
        <label htmlFor="password">Mot de passe</label>
        <input className="rounded-xl border-solid border-gray-400 p-2 border-2 text-black mb-10" type="password" id="password" name="password" required />
        <input type="submit" className="text-white bg-gray-800 px-4 py-2 hover:bg-gray-600" value="Connexion" />
    </form>)
}