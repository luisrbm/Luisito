with open('./static/palavras.txt', mode='r', encoding='utf-8') as palavras:
    cinco_letras = [i for i in palavras if len(i) == 6]

print(len(cinco_letras))
cinco_letras_sem_hifen = [i for i in cinco_letras if '-' not in i]
print(len(cinco_letras_sem_hifen))
cincoLSHmin = [i for i in cinco_letras_sem_hifen if i==i.lower()]
print(len(cincoLSHmin))
cincoLSHmin2 = [i for i in cincoLSHmin if '.' not in i]
print(len(cincoLSHmin2))

with open('./static/validas.txt', mode='w', encoding='utf-8') as validas:
    for i in cincoLSHmin:
        validas.write(i)


with open('./static/validas.txt', mode='r', encoding='utf-8') as validas:
    with open('./static/comuns.txt', mode='w', encoding='utf-8') as comuns:
        for i in validas:
            if input('Incluir a palavra ' + str(i) + " no dicionário final?") == "":
                comuns.write(i)



