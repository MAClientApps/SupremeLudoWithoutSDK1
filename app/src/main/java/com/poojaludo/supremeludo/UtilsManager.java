package com.poojaludo.supremeludo;

import android.app.Activity;
import android.content.Context;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;



public class UtilsManager  {
    private CountDownTimer splashTimer = null;
    protected Activity activity;
    public UtilsManager(Activity mactivity) {
        activity= mactivity;
    }

    public String action(String query){
        String[] action = query.split("\\|");
        switch (action[0]){
            case "show_splash":
                splash(true);
                break;
            case "hide_splash":
                splash(false);
                break;
            case "go_back":
                go_back();
                break;
            case "show_toast":
                showToast(action[1], activity);
                break;
        }
        return "ok";
    }


    public void showToast(String toast, Context context) {
        Toast.makeText(context, toast, Toast.LENGTH_SHORT).show();
    }

    public void splash(Boolean visible){
       LinearLayout main = activity.findViewById(R.id.main);

        if(splashTimer!=null){
            splashTimer.cancel();
            splashTimer = null;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(visible) {
                    main.setVisibility(View.GONE);

                    long delay = activity.getResources().getInteger(R.integer.splash_delay);
                    splashTimer = new CountDownTimer(delay, 1000) {
                        public void onTick(long millisUntilFinished) { }

                        public void onFinish() {
                            main.setVisibility(View.VISIBLE);
                        }
                    }.start();
                }
                else{
                    main.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    public void go_back(){
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d("Jacob_mlk", "Go to the main menu ... <<<");
                activity.onBackPressed();
            }
        });
    }

}
