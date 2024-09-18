echo -e 'Adding files:\n'
git add . && \

echo -e 'Status:\n' && \
git status && \

echo -e 'Committing changes\n' && \
git commit -m 'Code updated' && \

echo -e 'Pushing changes\n' && \
git push origin main
