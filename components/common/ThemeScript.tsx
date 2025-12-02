export function ThemeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
				(function() {
					const STORAGE_KEY = 'theme-preference';
					const stored = localStorage.getItem(STORAGE_KEY);
					const theme = stored && ['system', 'light', 'dark'].includes(stored) ? stored : 'system';
					const root = document.documentElement;

					if (theme === 'dark') {
						root.classList.add('dark');
					} else if (theme === 'light') {
						root.classList.remove('dark');
					} else {
						// system - check OS preference
						const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
						if (systemPrefersDark) {
							root.classList.add('dark');
						} else {
							root.classList.remove('dark');
						}
					}
				})();
			`,
			}}
		/>
	)
}

