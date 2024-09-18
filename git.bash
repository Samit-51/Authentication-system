clear
echo -e '\n\nStatus:\n' && \
git status && \

echo -e '\n\nAdding files:'
git add . && \
echo -e '\n\nCommitting changes\n' && \
git commit -m 'Code updated' && \

echo -e '\nPushing changes\n' && \
git push origin main
