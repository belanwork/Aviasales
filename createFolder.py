import sys
import os
import inspect

def createFolder(folder_name):
    JSX_code = inspect.cleandoc(
        '''import React from 'react'
        import s from './%s.module.css'

        export const %s = props => {
            return (
                <div className={s.componentContainer}>
                    %s
                </div>
            )
        }''' % (folder_name, folder_name, folder_name)
    ) 

    module_css_code = inspect.cleandoc(
        '''.componentContainer {

        }'''
    )
    os.chdir("src/components/")
    os.mkdir(folder_name)
    os.chdir(folder_name)
    with open(f'{folder_name}.jsx','w') as jsx:
        jsx.write(JSX_code)
    with open(f'{folder_name}.module.css','w') as module_css:
        module_css.write(module_css_code)
    return "DONE!"




if __name__ == "__main__":
    createFolder(sys.argv[1])