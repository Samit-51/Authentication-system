GNU nano 8.2             git.bash
clear
echo -e '\n\nStatus:\n' && \
git status && \

echo -e '\n\nAdding files:'
git add . && \

echo -e '\n\nStatus:\n' && \
git status && \
echo -e '\n\nCommitting changes\n' && \
git commit -m 'Code updated' && \

echo -e '\nPushing changes\n' && \
git push origin ma
